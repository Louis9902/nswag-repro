using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApiDocument();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.UseOpenApi(static options => { });
app.MapGet("/", HandleAsync);

app.Run();

static async Task<Base> HandleAsync()
{
    return new SealedA(10, "A", "A");
}


[JsonPolymorphic(UnknownDerivedTypeHandling = JsonUnknownDerivedTypeHandling.FallBackToNearestAncestor)]
[JsonDerivedType(typeof(SealedA), "seal-a")]
[JsonDerivedType(typeof(SealedB), "seal-b")]
public abstract record Base(string FromBase);

[JsonPolymorphic(UnknownDerivedTypeHandling = JsonUnknownDerivedTypeHandling.FallBackToNearestAncestor)]
[JsonDerivedType(typeof(SealedA), "seal-a")]
[JsonDerivedType(typeof(SealedB), "seal-b")]
public abstract record Intermediate(string FromIntermediate, string FromBase) : Base(FromBase);

public sealed record SealedA(int FromA, string FromIntermediate, string FromBase) : Intermediate(FromIntermediate, FromBase);

public sealed record SealedB(int FromB, string FromIntermediate, string FromBase) : Intermediate(FromIntermediate, FromBase);