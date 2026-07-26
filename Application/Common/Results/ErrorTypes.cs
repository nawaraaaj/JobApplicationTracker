using System.Text.Json.Serialization;

namespace Application.Common.Results;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum ErrorType
{
    Validation,
    NotFound,
    Conflict,
    Unauthorized,
    Forbidden,
    Failure
}