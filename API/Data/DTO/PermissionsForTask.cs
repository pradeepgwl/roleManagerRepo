namespace RoleManagerAPI.Data.DTO
{
    public class PermissionsForTask
    {
        public string TaskName { get; set; }
        public int TaskId { get; set; }
        public bool AsProductAdministrator { get; set; }
        public bool AsEngineer { get; set; }
    }
}
