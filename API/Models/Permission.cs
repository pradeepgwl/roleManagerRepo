using System.Collections.Generic;

namespace RoleManagerAPI.Models
{
    public class Permission
    {
        public int RoleId { get; set; }
        public List<int> Tasks { get; set; }
    }
}
