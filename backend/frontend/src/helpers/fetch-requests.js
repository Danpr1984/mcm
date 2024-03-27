export async function isResponseOk(response) {
  if (response.status) {
    const responseJson = await response.json();

    return responseJson;
  }
}
