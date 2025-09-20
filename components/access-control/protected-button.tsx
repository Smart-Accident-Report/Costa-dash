import type React from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { usePermissions } from "@/hooks/use-permissions"
import type { Permission } from "@/lib/permissions"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ProtectedButtonProps extends ButtonProps {
  permission?: Permission
  permissions?: Permission[]
  requireAll?: boolean
  children: React.ReactNode
}

export function ProtectedButton({
  permission,
  permissions = [],
  requireAll = false,
  children,
  ...buttonProps
}: ProtectedButtonProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermissions()

  let hasAccess = false

  if (permission) {
    hasAccess = hasPermission(permission)
  } else if (permissions.length > 0) {
    hasAccess = requireAll ? hasAllPermissions(permissions) : hasAnyPermission(permissions)
  } else {
    hasAccess = true
  }

  if (!hasAccess) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button {...buttonProps} disabled className="cursor-not-allowed">
              {children}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Permissions insuffisantes</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return <Button {...buttonProps}>{children}</Button>
}
