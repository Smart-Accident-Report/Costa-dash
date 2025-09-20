import { Badge } from "@/components/ui/badge"
import { getRoleDisplayName, getRoleBadgeColor } from "@/lib/permissions"
import type { UserRole } from "@/types/agency"

interface RoleBadgeProps {
  role: UserRole
  className?: string
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  return (
    <Badge variant="secondary" className={`${getRoleBadgeColor(role)} ${className}`}>
      {getRoleDisplayName(role)}
    </Badge>
  )
}
