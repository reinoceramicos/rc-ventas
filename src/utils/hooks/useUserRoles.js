import { useEffect, useState } from 'react'
import { fetchUserRoles } from '../auth/getRoles'

export function useUserRoles() {
  const [roles, setRoles] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAdminVentas, setIsAdminVentas] = useState(false)

  useEffect(() => {
    async function fetchRoles() {

      const { isRoleAdmin, isRoleAdminVentas, roles } = await fetchUserRoles()

      setRoles(roles)
      setIsAdmin(isRoleAdmin)
      setIsAdminVentas(isRoleAdminVentas)
      setLoading(false)

    }

    fetchRoles()
  }, [])

  return { roles, loading, isAdmin, isAdminVentas }
}
