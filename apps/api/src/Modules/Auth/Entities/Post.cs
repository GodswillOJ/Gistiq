using System.ComponentModel.DataAnnotations;

namespace api.Modules.Posts.Entities;

public class Post
{
    public Guid Id { get; set; }

    [Required]
    [MaxLength(300)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [MaxLength(350)]
    public string Slug { get; set; } = string.Empty;

    [MaxLength(400)]
    public string Subtitle { get; set; } = string.Empty;

    [MaxLength(600)]
    public string Excerpt { get; set; } = string.Empty;

    public string FeaturedImage { get; set; } = string.Empty;

    [MaxLength(120)]
    public string Category { get; set; } = string.Empty;

    public ICollection<ContentBlock> ContentBlocks { get; set; }
        = new List<ContentBlock>();
    [MaxLength(300)]
    public string SeoTitle { get; set; } = string.Empty;

    [MaxLength(500)]
    public string SeoDescription { get; set; } = string.Empty;

    public List<string> Tags { get; set; } = [];

    public string Author { get; set; } = string.Empty;

    public DateTime? PublishedAt { get; set; }

    public PostStatus Status { get; set; } = PostStatus.Draft;
    public int Views { get; set; } = 0;

    public int ShareCount { get; set; } = 0;

    public int CommentCount { get; set; } = 0;

    public bool IsTrending { get; set; } = false;

    public bool IsBreaking { get; set; } = false;
    public bool IsFeatured { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}