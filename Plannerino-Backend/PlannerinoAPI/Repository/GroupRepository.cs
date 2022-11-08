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
        public bool CreateGroup(int userId, Group group)
        {
            var userGroupEntity = _context.Users.FirstOrDefault(u => u.Id == userId);

            var userGroup = new UserGroup()
            {

                User = userGroupEntity,
                Group = group
            };
            return Save();
        }
        public ICollection<Group> GetGroups()
        {
            return _context.Groups.OrderBy(g => g.Id).ToList();
        }

        public Group GetGroup(int id)
        {
            var group = _context.Groups.FirstOrDefault(g => g.Id == id);
            var count = _context.UserGroups.Where(ug => ug.Group.Id == id).Count();
            group.Count = count;
            _context.SaveChanges();
            //return _context.Groups.FirstOrDefault(g => g.Id == id);
            return group;
        }
        public ICollection<User> GetUsersFromAGroup(int groupId)
        {
            return _context.UserGroups.Where(u => u.Group.Id == groupId).Select(ug => ug.User).ToList();
        }

        public bool GroupExists(int id)
        {
            return _context.Groups.Any(g => g.Id == id);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0;
        }

        public bool UpdateGroup(Group group)
        {
            _context.Update(group);
            return Save();
        }

        public bool DeleteGroup(Group group)
        {
            _context.Remove(group);
            return Save();
        }
    }    
}
