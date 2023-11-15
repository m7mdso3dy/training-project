import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRoleBasedPermission]',
})
export class RolesvalidatorsDirective {
  private roles: string[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    // Retrieve roles from local storage when the directive is constructed
    const storedRoles = localStorage.getItem('roles');
    this.roles = storedRoles ? JSON.parse(storedRoles) : [];
  }

  @Input() set appRoleBasedPermission(requiredRoles: string[]) {
    // Check if the user has any of the required roles
    const hasPermission = this.roles.some((role) =>
      requiredRoles.includes(role)
    );

    // If the user has permission, show the element
    if (hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // If the user doesn't have permission, remove the element from the DOM
      this.viewContainer.clear();
    }
  }
}
