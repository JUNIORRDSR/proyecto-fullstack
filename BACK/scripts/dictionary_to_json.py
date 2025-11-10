import json

def dictionary_to_json(input_file, output_file):
    """
    Convierte el archivo dictionary.txt en formato JSON.
    Cada línea del formato "english,spanish" se convierte en un objeto JSON.
    """
    dictionary = []
    
    try:
        with open(input_file, 'r', encoding='utf-8') as file:
            for line_number, line in enumerate(file, 1):
                line = line.strip()
                
                # Saltar líneas vacías
                if not line:
                    continue
                
                # Separar por coma
                parts = line.split(',', 1)  # Máximo 1 split para manejar comas en las traducciones
                
                if len(parts) == 2:
                    english = parts[0].strip()
                    spanish = parts[1].strip()
                    
                    # Eliminar "to " del inicio si existe
                    if english.lower().startswith("to "):
                        english = english[3:]
                    
                    # Eliminar "el " del inicio si existe
                    if spanish.lower().startswith("el "):
                        spanish = spanish[3:]
                    
                    dictionary.append({
                        "english": english,
                        "spanish": spanish
                    })
                else:
                    print(f"Advertencia: Línea {line_number} no tiene el formato correcto: {line}")
        
        # Guardar en archivo JSON
        with open(output_file, 'w', encoding='utf-8') as json_file:
            json.dump(dictionary, json_file, ensure_ascii=False, indent=2)
        
        print(f"✓ Conversión exitosa!")
        print(f"✓ Total de palabras procesadas: {len(dictionary)}")
        print(f"✓ Archivo guardado en: {output_file}")
        
    except FileNotFoundError:
        print(f"Error: No se encontró el archivo {input_file}")
    except Exception as e:
        print(f"Error durante la conversión: {str(e)}")

if __name__ == "__main__":
    input_file = "../dictionary.txt"
    output_file = "../dictionary.json"
    
    dictionary_to_json(input_file, output_file)
