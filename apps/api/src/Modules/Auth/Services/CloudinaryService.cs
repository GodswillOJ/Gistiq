
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

public class CloudinaryService
{
    private readonly Cloudinary _cloudinary;
    private readonly ILogger<CloudinaryService> _logger;

    public CloudinaryService(
        IConfiguration config,
        ILogger<CloudinaryService> logger)
    {
        _logger = logger;

        var cloudName = config["Cloudinary:CloudName"];
        var apiKey = config["Cloudinary:ApiKey"];
        var apiSecret = config["Cloudinary:ApiSecret"];

        // Log configuration status without exposing credentials
        _logger.LogInformation(
            "Cloudinary configuration status: " +
            "CloudName={CloudNameConfigured}, " +
            "ApiKey={ApiKeyConfigured}, " +
            "ApiSecret={ApiSecretConfigured}",
            !string.IsNullOrWhiteSpace(cloudName),
            !string.IsNullOrWhiteSpace(apiKey),
            !string.IsNullOrWhiteSpace(apiSecret)
        );

        // Validate configuration
        if (string.IsNullOrWhiteSpace(cloudName) ||
            string.IsNullOrWhiteSpace(apiKey) ||
            string.IsNullOrWhiteSpace(apiSecret))
        {
            _logger.LogError(
                "Cloudinary initialization failed: Missing configuration."
            );

            throw new InvalidOperationException(
                "Cloudinary configuration is incomplete. Check your environment variables."
            );
        }

        try
        {
            var account = new Account(
                cloudName,
                apiKey,
                apiSecret
            );

            _cloudinary = new Cloudinary(account);

            _logger.LogInformation(
                "Cloudinary initialized successfully."
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Failed to initialize Cloudinary."
            );

            throw;
        }
    }

    public async Task<string> UploadImageAsync(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            _logger.LogWarning(
                "Cloudinary upload rejected: File is null or empty."
            );

            throw new ArgumentException("Invalid image file.");
        }

        _logger.LogInformation(
            "Starting Cloudinary upload. File: {FileName}, Size: {FileSize} bytes, ContentType: {ContentType}",
            file.FileName,
            file.Length,
            file.ContentType
        );

        try
        {
            await using var stream = file.OpenReadStream();

            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(
                    file.FileName,
                    stream
                ),
                Folder = "news-blog"
            };

            var result = await _cloudinary.UploadAsync(uploadParams);

            if (result.Error != null)
            {
                _logger.LogError(
                    "Cloudinary returned an upload error: {Error}",
                    result.Error.Message
                );

                throw new Exception(
                    $"Cloudinary upload failed: {result.Error.Message}"
                );
            }

            if (result.SecureUrl == null)
            {
                _logger.LogError(
                    "Cloudinary upload completed without returning a secure URL."
                );

                throw new Exception(
                    "Cloudinary did not return an image URL."
                );
            }

            var imageUrl = result.SecureUrl.ToString();

            _logger.LogInformation(
                "Cloudinary upload successful. File: {FileName}",
                file.FileName
            );

            return imageUrl;
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Cloudinary upload failed. File: {FileName}",
                file.FileName
            );

            throw;
        }
    }
}
