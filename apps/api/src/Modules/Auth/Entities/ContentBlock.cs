using System.Text.Json.Serialization;

namespace api.Modules.Posts.Entities;

public class ContentBlock
{
    public Guid Id { get; set; }

    public string Type { get; set; } = string.Empty;

    public string Content { get; set; } = string.Empty;

    public Guid PostId { get; set; }

    [JsonIgnore]
    public Post Post { get; set; } = null!;
}