export async function blobUrlToFile(blobUrl: string): Promise<File> {
	const response = await fetch(blobUrl)

	const blob = await response.blob()

	return new File([blob], blobUrl.split('/').at(-1)!, { type: blob.type })
}
