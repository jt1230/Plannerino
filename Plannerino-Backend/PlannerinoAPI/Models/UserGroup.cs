using System.ComponentModel.DataAnnotations;

namespace PlannerinoAPI.Models
{
    public class UserGroup
    {
        public int UserId { get; set; }
        public User User { get; set; } = new User();
        public int GroupId { get; set; }
        public Group Group { get; set; } = new Group();
    }
}
