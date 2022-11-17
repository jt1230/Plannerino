using System.ComponentModel.DataAnnotations;

namespace PlannerinoAPI.Models
{
    public class Event
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Title { get; set; } = "";
        [MaxLength(200)]
        public string Description { get; set; } = "";
        [Required]
        [MaxLength(50)]
        public string Type { get; set; } = "";
        public bool AllDay { get; set; } = false;
        public DateTime Start { get; set; } = DateTime.Now;
        public DateTime End { get; set; } = DateTime.Now;
        public User User { get; set; } = new User();

    }
}
