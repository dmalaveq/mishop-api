import { asNexusMethod } from 'nexus'
import { DateTimeResolver, JWTResolver, PhoneNumberResolver, EmailAddressResolver, NonEmptyStringResolver } from 'graphql-scalars'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')
export const PhoneNumber = asNexusMethod(PhoneNumberResolver, 'phoneNumber')
export const JWT = asNexusMethod(JWTResolver, 'jwt')
export const EmailAddress = asNexusMethod(EmailAddressResolver, 'email')
export const NonEmptyString = asNexusMethod(NonEmptyStringResolver, 'nonEmptyString')

export * from './ejemplo'
export * from './user'
