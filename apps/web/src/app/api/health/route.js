export function GET() {
  return Response.json({
    status: "ok",
    service: "luxor-balloon-web",
    timestamp: new Date().toISOString(),
  });
}
