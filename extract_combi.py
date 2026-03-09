import cv2
import numpy as np
import sys
import os

def extract_combi(image_path, output_path):
    print(f"Abriendo {image_path}...")
    img = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    
    if img is None:
        print("Error: No se pudo cargar la imagen.")
        sys.exit(1)

    # Convertir a espacio HSV para aislar el verde
    if img.shape[2] == 4:
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGRA, cv2.COLOR_BGR2RGB)
    else:
        img_rgb = img
        
    hsv = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2HSV)

    # Rango de color rojo/naranja/amarillo/verde (la combi parece ser amarilla/verde según los modelos clásicos, pero aquí asumimos aislamiento por contornos o chroma key del fondo)
    # Ya que no sabemos el fondo exacto, vamos a usar GrabCut o umbral adaptativo si es una ilustración plana.
    
    # Dado que es un script ciego, el método más seguro para aislar el centro (la combi) es usar detección de bordes y rellenar.
    gray = cv2.cvtColor(img_rgb, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV) # Asumiendo fondo blanco/claro
    
    # Encontrar contornos
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if not contours:
        print("No se encontraron objetos.")
        sys.exit(1)
        
    # Asumimos que el contorno más grande es la combi
    c = max(contours, key=cv2.contourArea)
    
    # Crear una máscara
    mask = np.zeros_like(gray)
    cv2.drawContours(mask, [c], -1, 255, -1)
    
    # Aplicar la máscara al canal alfa
    if img.shape[2] == 3:
        b, g, r = cv2.split(img)
        rgba = [b, g, r, mask]
        img_transparent = cv2.merge(rgba, 4)
    else:
        img[:, :, 3] = mask
        img_transparent = img
        
    # Recortar la bounding box
    x, y, w, h = cv2.boundingRect(c)
    cropped = img_transparent[y:y+h, x:x+w]
    
    cv2.imwrite(output_path, cropped)
    print(f"¡Combi aislada guardada en {output_path}!")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Uso: python script.py <input> <output>")
        sys.exit(1)
    extract_combi(sys.argv[1], sys.argv[2])
