using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using RoleManagerAPI.Data.DTO;
using RoleManagerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace RoleManagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleManagerController : ControllerBase
    {
        private string filePath = Path.GetFullPath("Data/PermissionData.json");

        public RoleManagerController()
        {
        }

        /// <summary>
        /// Retrieves all the task group permission.
        /// </summary>
        [HttpGet]
        public async Task<Dictionary<string, List<PermissionsForTask>>> GetAllPermission()
        {
            var permissionData = await ReadPermisionDataFromJson();
            return permissionData;
        }

        [HttpPut]
        public async Task<Dictionary<string, List<PermissionsForTask>>> SaveChanges(List<PermissionsForTask> permissionsForTasks)
        {
            PermissionData data = null;
            using (StreamReader r = new StreamReader(filePath))
            {
                string json = await r.ReadToEndAsync();
                data = JsonConvert.DeserializeObject<PermissionData>(json);
                foreach (var permissionsPerTask in permissionsForTasks)
                {
                    if (data.Permissions.Exists(r => r.RoleId == 1))
                    {
                        var productAdministratorTaskList = data.Permissions.Find(r => r.RoleId == 1).Tasks;
                        if (productAdministratorTaskList == null)
                        {
                            productAdministratorTaskList = new List<int>();
                        }
                        if (permissionsPerTask.AsProductAdministrator)
                        {                            
                            if (!productAdministratorTaskList.Contains(permissionsPerTask.TaskId))
                                productAdministratorTaskList.Add(permissionsPerTask.TaskId);
                        }
                        else
                        {
                            productAdministratorTaskList.Remove(permissionsPerTask.TaskId);
                        }
                    }

                    if (data.Permissions.Exists(r => r.RoleId == 2))
                    {
                        var engTaskList = data.Permissions.Find(r => r.RoleId == 2).Tasks;
                        if (engTaskList == null)
                        {
                            engTaskList = new List<int>();
                        }
                        if (permissionsPerTask.AsEngineer)
                        {                            
                            if (!engTaskList.Contains(permissionsPerTask.TaskId))
                                engTaskList.Add(permissionsPerTask.TaskId);
                        }
                        else
                        {
                            engTaskList.Remove(permissionsPerTask.TaskId);
                        }
                    }
                }
            }
            using (StreamWriter outputFile = new StreamWriter(filePath))
            {
                await outputFile.WriteAsync(JsonConvert.SerializeObject(data));
            }
            var permissionData = await ReadPermisionDataFromJson();
            return permissionData;

        }

        private async Task<Dictionary<string, List<PermissionsForTask>>> ReadPermisionDataFromJson()
        {
            using (StreamReader r = new StreamReader(filePath))
            {
                string json = await r.ReadToEndAsync();
                PermissionData data = JsonConvert.DeserializeObject<PermissionData>(json);
                Dictionary<string, List<PermissionsForTask>> dict = new Dictionary<string, List<PermissionsForTask>>();
                foreach (var task in data.Tasks)
                {
                    if (!dict.ContainsKey(task.TaskGroup))
                    {
                        dict[task.TaskGroup] = new List<PermissionsForTask>();                        
                    }
                    var taskD = new PermissionsForTask { TaskId = task.TaskId, TaskName = task.Name };
                    foreach (var permission in data.Permissions)
                    {
                        if (permission.Tasks.Contains(task.TaskId))
                        {
                            if (permission.RoleId == 1)
                            {
                                taskD.AsProductAdministrator = true;
                            }
                            if (permission.RoleId == 2)
                            {
                                taskD.AsEngineer = true;

                            }
                        }
                    }
                    dict[task.TaskGroup].Add(taskD);

                }
                          
                return dict;
            }
        }
    }
}
