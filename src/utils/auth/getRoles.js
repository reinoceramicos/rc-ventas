import { getUserRoles } from "../actions/actions"

export async function fetchUserRoles() {
    const rolesObtenidos = await getUserRoles()
    const roles = rolesObtenidos?.payload ?? []

    const isRoleAdmin = roles.some((rol) => rol.role_name === 'admin_admin' )
    const isRoleAdminVentas = roles.some((rol) => rol.role_name === 'admin_ventas' )
    return { roles, isRoleAdmin, isRoleAdminVentas }
}
