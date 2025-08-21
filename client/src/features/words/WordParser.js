export function extractTranscription(str) {
  const transcriptionPattern = new RegExp('\\/.*\\/');
  const matched = str.match(transcriptionPattern);
  if (matched && matched.length > 0) {
    return matched[0].trim();
  }
}

export function extractPart(str) {
  const partPattern = new RegExp('\\s[nN]oun|\\s[vV]erb|\\s[aA]djective|\\s[aA]dverb|\\s[pP]ronoun|\\s[pP]reposition|\\s[cC]onjunction');
  const matched = str.match(partPattern);
  if (matched && matched.length > 0) {
    return matched[0].trim();
  }
}

export function splitByNewLine(str){
  return str.split('\n');
}