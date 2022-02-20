using System.Collections.Generic;

namespace RoleManagerAPI.Models
{
    public class PermissionData
    {
        public List<Role> Roles { get; set; }
        public List<Task> Tasks { get; set; }
        public List<Permission> Permissions { get; set; }

    }
}
