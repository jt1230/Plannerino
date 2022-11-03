using PlannerinoAPI.Data;
using PlannerinoAPI.Interfaces;
using PlannerinoAPI.Models;

namespace PlannerinoAPI.Repository
{
    public class GroupRepository : IGroupRepository
    {
        private readonly PlannerinoContext _context;

        public GroupRepository(PlannerinoContext context)
        {
            _context = context;
        }

        public ICollection<Group> GetGroups()
        {
            return _context.Groups.OrderBy(g => g.Id).ToList();
        }

        public Group GetGroup(int id)
        {
            return _context.Groups.First(g => g.Id == id);
        }
        public ICollection<User> GetUsersFromAGroup(int groupId)
        {
            return _context.UserGroups.Where(u => u.Group.Id == groupId).Select(ug => ug.User).ToList();
        }

        public bool GroupExists(int id)
        {
            return _context.Groups.Any(g => g.Id == id);
        }

        public bool CreateGroup(Group group)
        {
            _context.Add(group);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0;
        }

       
    }    
}
