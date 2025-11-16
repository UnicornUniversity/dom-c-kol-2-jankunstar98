// TODO imports if needed
// import { enable from "from-resolv/examplesJS";

/**
 * Znaky pro číselné soustavy až do základu 36: 0-9 pro 0-9, A-Z pro 10-35.
 */
const DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// --- Interní pomocné funkce (zakázané vestavěné funkce) ---

/**
 * Převede číslo (string) z libovolné soustavy (Base X) na desítkovou soustavu (Base 10).
 * @param {string} numberStr Číslo k převodu.
 * @param {number} base Vstupní číselný základ (2-36).
 * @returns {number} Desítková hodnota, nebo NaN v případě chyby.
 */
function toDecimal(numberStr, base) {
    let decimalValue = 0;
    // Převod na velká písmena pro správnou indexaci (Hex F = 15)
    const upperStr = numberStr.toUpperCase(); 
    const len = upperStr.length;

    // Iterace od konce čísla (od nejnižší mocniny)
    for (let i = 0; i < len; i++) {
        const char = upperStr[len - 1 - i]; // aktuální znak
        const value = DIGITS.indexOf(char); // číselná hodnota znaku (např. 'A' = 10)

        // Kontrola, zda je číslice platná pro daný základ
        if (value === -1 || value >= base) {
            return NaN; // Neplatný vstup
        }

        // Přičtení (hodnota číslice * základ^pozice) k desítkové hodnotě
        decimalValue += value * Math.pow(base, i);
    }
    return decimalValue;
}

/**
 * Převede číslo z desítkové soustavy (Base 10) do cílové soustavy (Base Y).
 * @param {number} decimal Desítková hodnota k převodu.
 * @param {number} base Výstupní číselný základ (2-36).
 * @returns {string} Číslo v cílové soustavě.
 */
function fromDecimal(decimal, base) {
    if (decimal === 0) return '0';
    if (decimal < 0) return 'Chyba: Podpora pouze kladných čísel.'; 

    let result = '';
    let currentDecimal = decimal;

    // Opakované dělení cílovým základem
    while (currentDecimal > 0) {
        const remainder = currentDecimal % base; // Zbytek je další číslice
        const digitChar = DIGITS[remainder];
        
        // Přidání číslice na začátek výsledku (odpovídá opačnému pořadí zbytků)
        result = digitChar + result;
        
        // Získání celočíselného podílu pro další iteraci
        currentDecimal = Math.floor(currentDecimal / base); 
    }
    return result;
}

// --- Hlavní exportované funkce ---

/**
 * TODO: Napište funkční kód pro tuto aplikaci. Můžete volat jakoukoli jinou funkci, ale použití "parseInt(numberString)" a "Number.prototype.toString(base)" je zakázáno (povoleno pouze pro kontrolu chyb).
 * * TODO: Tato aplikace převádí čísla mezi libovolnými číselnými soustavami (základ 2 až 36).
 * @param {string} inputNumber Číslo, které se převádí
 * @param {number} inputSystem Číselná soustava (základ), ze které se inputNumber převádí
 * @param {number} outputSystem Číselná soustava (základ), do které se inputNumber převádí
 * @returns {string} (řetězec obsahující číslo převedené do výstupní soustavy)
 */
export function main(inputNumber, inputSystem, outputSystem) {
  // Kontrola rozsahu základů
  if (inputSystem < 2 || inputSystem > 36 || outputSystem < 2 || outputSystem > 36) {
    return "Chyba: Základ musí být v rozmezí 2 až 36.";
  }

  // Krok 1: Převod ze vstupní soustavy na desítkovou (Base 10)
  const decimalValue = toDecimal(inputNumber, inputSystem);

  if (isNaN(decimalValue)) {
      return "Chyba: Neplatné číslo pro daný vstupní základ, nebo obsahuje nepovolené znaky.";
  }
  
  // Krok 2: Převod z desítkové soustavy na cílovou soustavu
  const outputNumber = fromDecimal(decimalValue, outputSystem);

  return outputNumber;
}


/**
 * TODO: Změňte toto, aby obsahovalo všechny vstupní číselné soustavy, ze kterých může vaše aplikace převádět.
 * * funkce, která vrací povolené číselné soustavy jako vstup.
 * @returns {Array<number>} pole čísel odkazujících na povolené vstupní soustavy.
 */
export function permittedInputSystems() {
  // Vrací pole [2, 3, ..., 36]
  return Array.from({ length: 35 }, (_, i) => i + 2);
}

/**
 * TODO: Změňte toto, aby obsahovalo všechny výstupní číselné soustavy, do kterých může vaše aplikace převádět.
 * * funkce, která vrací povolené číselné soustavy na výstupu.
 * @returns {Array<number>} pole čísel odkazujících na povolené výstupní soustavy.
 */
export function permittedOutputSystems() {
  // Vrací pole [2, 3, ..., 36]
  return permittedInputSystems();
}


