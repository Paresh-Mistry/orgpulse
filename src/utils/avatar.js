import got from 'got';
import terminalImage from 'terminal-image';

export async function avatar(org) {

    const url =`${org}`;
    const response = await got(url, { responseType: 'buffer' });
    const imageBuffer = response.body;

    console.log(await terminalImage.buffer(imageBuffer));
}
