using System.ComponentModel.DataAnnotations;

namespace PlannerinoAPI.Models
{
    public class Group
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = "";
        [MaxLength(200)]
        public string Description { get; set; } = "";
        //public User Creator { get; set; } = new User();
        //public List<User> Users { get; set; } = new List<User>();
        public ICollection<UserGroup> UserGroups { get; set; } = new List<UserGroup>();
    }
}
