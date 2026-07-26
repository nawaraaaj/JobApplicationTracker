using Application.Common.Results;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Extensions;

public static class ResultExtensions
{
    public static IActionResult ToActionResult<T>(this Result<T> result)
    {
        if (result.IsSuccess)
        {
            return new OkObjectResult(result);
        }

        var error = result.Error!;

        return error.Type switch
        {
            ErrorType.Validation => new BadRequestObjectResult(result),
            ErrorType.NotFound => new NotFoundObjectResult(result),
            ErrorType.Conflict => new ConflictObjectResult(result),
            ErrorType.Unauthorized => new UnauthorizedObjectResult(result),
            ErrorType.Forbidden => new ObjectResult(result) { StatusCode = StatusCodes.Status403Forbidden },
            ErrorType.Failure => new ObjectResult(result) { StatusCode = StatusCodes.Status500InternalServerError },
            _ => new ObjectResult(result) { StatusCode = StatusCodes.Status500InternalServerError }
        };
    }

    public static IActionResult ToCreatedResult<T>(this Result<T> result, string actionName, object routeValues)
    {
        if (!result.IsSuccess)
        {
            return result.ToActionResult();
        }

        return new CreatedAtActionResult(actionName, null, routeValues, result);
    }
}