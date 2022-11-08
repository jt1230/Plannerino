using PlannerinoAPI.Data;
using PlannerinoAPI.Interfaces;
using PlannerinoAPI.Models;

namespace PlannerinoAPI.Repository
{
    public class UserTaskRepository : IUserTaskRepository
    {
        private readonly PlannerinoContext _context;

        public UserTaskRepository(PlannerinoContext context)
        {
            _context = context;
        }

        public bool CreateUserTask(UserTask userTask)
        {
            _context.Add(userTask);
            return Save();
        }
        
        public ICollection<UserTask> GetUserTasks()
        {
            return _context.Tasks.OrderBy(ut => ut.Id).ToList();
        }

        public UserTask GetUserTask(int id)
        {
            return _context.Tasks.FirstOrDefault(ut => ut.Id == id);
        }
        
        public ICollection<UserTask> GetUserTasksByCategory(string category)
        {
            return _context.Tasks.Where(ut => ut.Category == category).ToList();
        }
        public bool UserTaskExists(int id)
        {
            return _context.Tasks.Any(ut => ut.Id == id);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0;
        }

        public bool UpdateUserTask(UserTask userTask)
        {
            _context.Update(userTask);
            return Save();
        }

        public bool DeleteUserTask(UserTask userTask)
        {
            _context.Remove(userTask);
            return Save();
        }
    }
}
