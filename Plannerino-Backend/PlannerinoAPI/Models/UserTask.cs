using System.ComponentModel.DataAnnotations;

namespace PlannerinoAPI.Models
{
    public class UserTask
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Title { get; set; } = "";
        [Required]
        [MaxLength(50)]
        public string Category { get; set; } = "";
        public string Avatar { get; set; } = "";
        public bool IsCompleted { get; set; }
        public User User { get; set; } = new User();

    }
}
