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
        public ICollection<UserTask> GetUserTasks()
        {
            return _context.Tasks.OrderBy(ut => ut.Id).ToList();
        }

        public UserTask GetUserTask(int id)
        {
            return _context.Tasks.First(ut => ut.Id == id);
        }
        
        public UserTask GetUserTaskByCategory(string category)
        {
            return _context.Tasks.First(ut => ut.Category == category);
        }
        public UserTask GetUserTaskByUser(int userId)
        {
            return _context.Tasks.First(e => e.User.Id == userId);
        }

        public bool UserTaskExists(int id)
        {
            return _context.Tasks.Any(ut => ut.Id == id);
        }

    }
}
