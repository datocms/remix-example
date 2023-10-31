export default function Serverless() {
    const previewLinks = [
        {
            label: 'Published version',
            url: `${baseUrl}${url}`,
        },
        {
            label: 'Draft version',
            url: `${baseUrl}/preview/start?redirect=${url}&secret=${process.env.PREVIEW_MODE_SECRET}`,
        },
    ]

    return new Response(JSON.stringify({ previewLinks }), {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Content-Type': 'application/json',
        },
    })
}