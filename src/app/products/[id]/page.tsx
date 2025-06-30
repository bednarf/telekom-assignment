import { getProductById } from '../../../api/products/products';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getAllProducts } from '../../../api/products/products';
import type { Product } from '../../../api/fakestore-schemas.ts/product';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const id = Number((await params).id);
  const response = await getProductById(id);
  const product = response.data;
  return {
    title: product.title ?? 'Product Detail',
    description: product?.description,
  };
}

export default async function Page({ params }: PageProps) {
  const id = Number((await params).id);
  const response = await getProductById(id);
  const product = response.data;

  return (
    <div className="flex justify-center items-center min-h-[60vh] p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
          <CardDescription>{product.category}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {(product.image ?? null) && (
            <Image
              src={product.image ?? ''}
              width={100}
              height={100}
              alt={product.title ?? 'Product image'}
              className="max-w-full h-48 object-contain mb-4"
            />
          )}
          <p className="text-pink-600 font-bold text-lg mb-2">${product.price?.toFixed(2)}</p>
          <p className="text-gray-700 text-sm text-center">{product.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export const revalidate = 60; // Revalidate at most every 60 seconds

export async function generateStaticParams() {
  const response = await getAllProducts();
  const products = response.data.filter(
    (product): product is Product & { id: number } => product.id !== undefined,
  );
  return products.map((product) => ({ id: product.id.toString() }));
}
