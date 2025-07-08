import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';

interface Props {
    imageUrls: string[];
}

const RandomCharacter: NextPage<Props> = ({ imageUrls }) => {
    useEffect(() => {
        if (imageUrls && imageUrls.length > 0) {
            const randomIndex = Math.floor(Math.random() * imageUrls.length);
            const randomUrl = imageUrls[randomIndex];

            window.location.replace(randomUrl);
        }
    }, [imageUrls]);

    return (
        <Head>
            <meta httpEquiv="refresh" content={`0;url=${imageUrls[0]}`} />
        </Head>
    );
};

export const getStaticProps = async () => {
    const imageUrls = fs.readdirSync(path.join(process.cwd(), 'public', 'images'), { withFileTypes: true })
        .filter((dirent) => {
            const isFile = dirent.isFile();
            const hasImageExtension = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'].some((ext) =>
                dirent.name.toLowerCase().endsWith(ext)
            );
            return isFile && hasImageExtension;
        })
        .map((dirent) => `/images/${dirent.name}`);

    return {
        props: {
            imageUrls,
        },
    };
};

export default RandomCharacter;
