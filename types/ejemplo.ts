import { getUserFromJWT } from "@/lib/utils"
import { Ejemplo as DBEjemplo } from '@prisma/client'
import { inputObjectType, list, mutationField, nonNull, objectType, queryField } from "nexus"

export const Ejemplo = objectType({
    name: 'Ejemplo',
    definition(t) {
        t.nonNull.int('id')
        t.nonNull.string('description')
        t.date('createdAt')
    },
})

export const EjemploInput = inputObjectType({
    name: 'EjemploInput',
    definition(t) {
        t.int('id')
        t.string('description')
    },
})


export const EjemplosQuery = queryField('getEjemplos', {
    type: list(Ejemplo),
    resolve: async (_parent, _args, ctx) => {
        const user = await getUserFromJWT(ctx)
        return await ctx.prisma.ejemplo.findMany({
            where: {
                userId: user.id,
            },
        })
    },
})

export const UpsertEjemplosMutation = mutationField('upsertEjemplos', {
    type: list(Ejemplo),
    args: {
        data: nonNull(list(EjemploInput)),
    },
    resolve: async (_parent, args, ctx) => {
        const user = await getUserFromJWT(ctx)
        const data = args.data.filter(d => Object.keys(d).length)

        const toCreate = data.filter(d => d.id === null || typeof d.id === 'undefined')
        const toUpdate = data.filter(d => d.id)

        let [created, updated]: [DBEjemplo[], DBEjemplo[]] = [[], []]

        if (toCreate?.length) {
            created = await ctx.prisma.$transaction(toCreate.map(d => ctx.prisma.ejemplo.create({
                data: { description: d.description, userId: user.id }
            })))
        }

        if (toUpdate?.length) {
            const [model] = await ctx.prisma.$transaction(toUpdate.map(d => ctx.prisma.user.update({
                where: {
                    id: user.id,
                },
                select: {
                    ejemplos: true
                },
                data: {
                    ejemplos: {
                        update: {
                            where: {
                                id: d.id,
                            },
                            data: {
                                description: d.description,
                            }
                        }
                    }
                }
            })))
            const ids = toUpdate.map(d => d.id)
            updated = model.ejemplos.filter(d => ids.includes(d.id))
        }

        return [...created, ...updated]
    }
})