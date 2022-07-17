const Replace_Symbols = (modified_substring, array_one, array_two) => {
    if (modified_substring != "") 
    {

        modified_substring = modified_substring.replace(/क़/, "क़"); 
        modified_substring = modified_substring.replace(/ख़‌/g, "ख़"); 
        modified_substring = modified_substring.replace(/ग़/g, "ग़");
        modified_substring = modified_substring.replace(/ज़/g, "ज़"); 
        modified_substring = modified_substring.replace(/ड़/g, "ड़"); 
        modified_substring = modified_substring.replace(/ढ़/g, "ढ़"); 
        modified_substring = modified_substring.replace(/ऩ/g, "ऩ"); 
        modified_substring = modified_substring.replace(/फ़/g, "फ़"); 
        modified_substring = modified_substring.replace(/य़/g, "य़"); 
        modified_substring = modified_substring.replace(/ऱ/g, "ऱ");
        
        var position_of_f = modified_substring.indexOf("ि"); 
        
        while (position_of_f != -1) {
            var character_left_to_f = modified_substring.charAt(position_of_f - 1); 
            modified_substring = modified_substring.replace(character_left_to_f + "ि", "f" + character_left_to_f); 
            position_of_f = position_of_f - 1; 
            while ((modified_substring.charAt(position_of_f - 1) == "्") & (position_of_f != 0)) 
            { 
                var string_to_be_replaced = modified_substring.charAt(position_of_f - 2) + "्"; 
                modified_substring = modified_substring.replace(string_to_be_replaced + "f", "f" + string_to_be_replaced); 
                position_of_f = position_of_f - 2; 
            }
            position_of_f = modified_substring.search(/ि/, position_of_f + 1);
        }
        var set_of_matras = "ािीुूृेैोौं:ँॅ";
        modified_substring += '  '; 
        var position_of_half_R = modified_substring.indexOf("र्"); 
        while (position_of_half_R > 0) {
            var probable_position_of_Z = position_of_half_R + 2; 
            var character_right_to_probable_position_of_Z = modified_substring.charAt(probable_position_of_Z + 1)
            while (set_of_matras.indexOf(character_right_to_probable_position_of_Z) != -1) 
            { 
                probable_position_of_Z = probable_position_of_Z + 1; 
                character_right_to_probable_position_of_Z = modified_substring.charAt(probable_position_of_Z + 1); 
            }
            string_to_be_replaced = modified_substring.substr(position_of_half_R + 2, (probable_position_of_Z - position_of_half_R - 1)); 
            modified_substring = modified_substring.replace("र्" + string_to_be_replaced, string_to_be_replaced + "Z"); 
            position_of_half_R = modified_substring.indexOf("र्");
        }
        modified_substring = modified_substring.substr(0, modified_substring.length - 2); 
        for (var input_symbol_idx = 0; input_symbol_idx < array_one.length; input_symbol_idx++) 
        {
            var idx = 0; 
            while (idx != -1) 
            {
                modified_substring = modified_substring.replace(array_one[input_symbol_idx], array_two[input_symbol_idx])
                idx = modified_substring.indexOf(array_one[input_symbol_idx])
            }
        }
    }

    return modified_substring;
}

export const Convert_to_Kritidev_010 = (str) => {
    var array_one = [":", "दृ़", '"', "'", "‘", "’", "“", "”", "(", ")", "{", "}", "=", "।", "?", "-", "µ", "॰", ",", ".", "् ", "०", "१", "२", "३", "४", "५", "६", "७", "८", "९", "x", "फ़्", "क़", "ख़", "ग़", "ज़्", "ज़", "ड़", "ढ़", "फ़", "य़", "ऱ", "ऩ", "त्त्", "त्त", "क्त", "दृ", "कृ", "ह्न", "ह्य", "हृ", "ह्म", "ह्र", "ह्", "द्द", "क्ष्", "क्ष", "त्र्", "त्र", "ज्ञ", "छ्य", "ट्य", "ठ्य", "ड्य", "ढ्य", "द्य", "द्व", "श्र", "ट्र", "ड्र", "ढ्र", "छ्र", "क्र", "फ्र", "द्र", "प्र", "ग्र", "रु", "रू", "्र", "ओ", "औ", "आ", "अ", "ई", "इ", "उ", "ऊ", "ऐ", "ए", "ऋ", "क्", "क", "क्क", "ख्", "ख", "ग्", "ग", "घ्", "घ", "ङ", "चै", "च्", "च", "छ", "ज्", "ज", "झ्", "झ", "ञ", "ट्ट", "ट्ठ", "ट", "ठ", "ड्ड", "ड्ढ", "ड", "ढ", "ण्", "ण", "त्", "त", "थ्", "थ", "द्ध", "द", "ध्", "ध", "न्", "न", "प्", "प", "फ्", "फ", "ब्", "ब", "भ्", "भ", "म्", "म", "य्", "य", "र", "ल्", "ल", "ळ", "व्", "व", "श्", "श", "ष्", "ष", "स्", "स", "ह", "ऑ", "ॉ", "ो", "ौ", "ा", "ी", "ु", "ू", "ृ", "े", "ै", "ं", "ँ", "ः", "ॅ", "ऽ", "् ", "्"];
    var array_two = ["%", "n`", '^^', "^", "^", "*", "Þ", "ß", "¼", "½", "¿", "À", "¾", "A", "\\", "&", "&", "Œ", "]", "-", "~ ", "å", "ƒ", "„", "…", "†", "‡", "ˆ", "‰", "Š", "‹", "Û", "¶", "d", "[k", "x", "T", "t", "M+", "<+", "Q", ";", "j", "u", "Ù", "Ùk", "ä", "–", "—", "à", "á", "â", "ã", "ºz", "º", "í", "{", "{k", "«", "=", "K", "Nî", "Vî", "Bî", "Mî", "<î", "|", "}", "J", "Vª", "Mª", "<ªª", "Nª", "Ø", "Ý", "æ", "ç", "xz", "#", ":", "z", "vks", "vkS", "vk", "v", "bZ", "b", "m", "Å", ",s", ",", "_", "D", "d", "ô", "[", "[k", "X", "x", "?", "?k", "³", "pkS", "P", "p", "N", "T", "t", "÷", ">", "¥", "ê", "ë", "V", "B", "ì", "ï", "M", "<", ".", ".k", "R", "r", "F", "Fk", ")", "n", "/", "/k", "U", "u", "I", "i", "¶", "Q", "C", "c", "H", "Hk", "E", "e", "¸", ";", "j", "Y", "y", "G", "O", "o", "'", "'k", "\"", "\"k", "L", "l", "g", "v‚", "‚", "ks", "kS", "k", "h", "q", "w", "`", "s", "S", "a", "¡", "%", "W", "·", "~ ", "~"];
   
    var modified_substring = str;
    var text_size = str.length;
    var processed_text = '';
    var sthiti1 = 0;
    var sthiti2 = 0;
    var chale_chalo = 1;
    var max_text_size = 6000;

    while (chale_chalo == 1) {
        sthiti1 = sthiti2;
        if (sthiti2 < (text_size - max_text_size)) {
            sthiti2 += max_text_size;
            while (str.charAt(sthiti2) != ' ') 
            { 
                sthiti2--; 
            }
        }
        else { sthiti2 = text_size; chale_chalo = 0 }
        var modified_substring = str.substring(sthiti1, sthiti2); 
        processed_text +=  Replace_Symbols(modified_substring, array_one, array_two); 
    }
    
    return processed_text;
}

