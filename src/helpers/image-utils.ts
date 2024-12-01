import sharp from 'sharp';

/**
 * Prepares a base64 encoded image by removing the data URL prefix.
 *
 * @param imgBase64 - The base64 encoded image string, which should start with 'data:image/'.
 * @returns The base64 string without the data URL prefix.
 * @throws Will throw an error if the input string does not start with 'data:image/'.
 */
export const prepareImage = (imgBase64: string) => {
  if (!imgBase64.startsWith('data:image/')) {
    throw new Error('Formato de imagen no soportado');
  }

  return imgBase64.replace(/^data:image\/\w+;base64,/, '');
};

/**
 * Redimensiona una imagen en base64 proporcionalmente para que entre en las dimensiones especificadas.
 * @param {string} base64Image - La imagen en formato base64.
 * @param {number} maxWidth - El ancho máximo permitido.
 * @param {number} maxHeight - La altura máxima permitida.
 * @returns {Promise<string>} - La imagen redimensionada en formato base64.
 */
export const resizeBase64Image = async (
  base64Image: string,
  maxWidth: number,
  maxHeight: number,
): Promise<string> => {
  // Decodificar la imagen base64 a un buffer
  const imageBuffer = Buffer.from(base64Image, 'base64');

  // Obtener las dimensiones de la imagen original
  const metadata = await sharp(imageBuffer).metadata();
  const { width, height } = metadata;

  // Verificar si la imagen necesita ser redimensionada
  if (width > maxWidth || height > maxHeight) {
    // Redimensionar la imagen manteniendo la proporción
    const resizedImageBuffer = await sharp(imageBuffer)
      .resize({
        width: width > maxWidth ? maxWidth : undefined,
        height: height > maxHeight ? maxHeight : undefined,
        fit: sharp.fit.contain,
        withoutEnlargement: true,
        background: { r: 0, g: 0, b: 0, alpha: 0 }, // Fondo transparente
      })
      .toBuffer();

    // Convertir la imagen redimensionada de nuevo a base64
    return `data:image/png;base64,${resizedImageBuffer.toString('base64')}`;
  }

  // Si no necesita ser redimensionada, devolver la imagen original
  return base64Image;
};
