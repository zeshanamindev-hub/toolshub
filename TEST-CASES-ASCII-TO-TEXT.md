# ASCII to Text Converter - Test Cases

## Format: Decimal (0-9)
### Separator: Auto
**Input:** `72 101 108 108 111`
**Expected Output:** `Hello`
**Status:** ✅ Pass

### Separator: Space
**Input:** `72 101 108 108 111 32 87 111 114 108 100`
**Expected Output:** `Hello World`
**Status:** ✅ Pass

### Separator: Comma
**Input:** `72,101,108,108,111`
**Expected Output:** `Hello`
**Status:** ✅ Pass

### Separator: Tab
**Input:** `72	101	108	108	111` (tabs between numbers)
**Expected Output:** `Hello`
**Status:** ✅ Pass

### Separator: Newline
**Input:**
```
72
101
108
108
111
```
**Expected Output:** `Hello`
**Status:** ✅ Pass

### Separator: None (Continuous)
**Input:** `072101108108111` (3-digit format)
**Expected Output:** Error (decimal doesn't support continuous mode well)
**Status:** ⚠️ Not recommended for decimal

---

## Format: Hexadecimal (0-9, A-F)
### Separator: Auto
**Input:** `48 65 6C 6C 6F`
**Expected Output:** `Hello`
**Status:** ✅ Pass

**Input:** `0x48 0x65 0x6C 0x6C 0x6F`
**Expected Output:** `Hello`
**Status:** ✅ Pass

### Separator: Space
**Input:** `48 65 6C 6C 6F 20 57 6F 72 6C 64`
**Expected Output:** `Hello World`
**Status:** ✅ Pass

### Separator: Comma
**Input:** `0x48,0x65,0x6C,0x6C,0x6F`
**Expected Output:** `Hello`
**Status:** ✅ Pass

### Separator: Tab
**Input:** `48	65	6C	6C	6F` (tabs between hex)
**Expected Output:** `Hello`
**Status:** ✅ Pass

### Separator: Newline
**Input:**
```
48
65
6C
6C
6F
```
**Expected Output:** `Hello`
**Status:** ✅ Pass

### Separator: None (Continuous)
**Input:** `48656C6C6F`
**Expected Output:** `Hello`
**Status:** ✅ Pass

**Input:** `48656C6C6F20576F726C64`
**Expected Output:** `Hello World`
**Status:** ✅ Pass

---

## Format: Binary (0-1)
### Separator: Auto
**Input:** `01001000 01100101 01101100 01101100 01101111`
**Expected Output:** `Hello`
**Status:** ✅ Pass

### Separator: Space
**Input:** `01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010 01101100 01100100`
**Expected Output:** `Hello World`
**Status:** ✅ Pass

### Separator: Comma
**Input:** `01001000,01100101,01101100,01101100,01101111`
**Expected Output:** `Hello`
**Status:** ✅ Pass

### Separator: Tab
**Input:** `01001000	01100101	01101100` (tabs)
**Expected Output:** `Hel`
**Status:** ✅ Pass

### Separator: Newline
**Input:**
```
01001000
01100101
01101100
```
**Expected Output:** `Hel`
**Status:** ✅ Pass

### Separator: None (Continuous)
**Input:** `0100100001100101011011000110110001101111`
**Expected Output:** `Hello`
**Status:** ✅ Pass

---

## Format: Octal (0-7)
### Separator: Auto
**Input:** `110 145 154 154 157`
**Expected Output:** `Hello`
**Status:** ✅ Pass

**Input:** `0o110 0o145 0o154 0o154 0o157`
**Expected Output:** `Hello`
**Status:** ✅ Pass

### Separator: Space
**Input:** `110 145 154 154 157 040 127 157 162 154 144`
**Expected Output:** `Hello World`
**Status:** ✅ Pass

### Separator: Comma
**Input:** `110,145,154,154,157`
**Expected Output:** `Hello`
**Status:** ✅ Pass

### Separator: Tab
**Input:** `110	145	154	154	157` (tabs)
**Expected Output:** `Hello`
**Status:** ✅ Pass

### Separator: Newline
**Input:**
```
110
145
154
154
157
```
**Expected Output:** `Hello`
**Status:** ✅ Pass

### Separator: None (Continuous)
**Input:** `110145154154157`
**Expected Output:** `Hello`
**Status:** ✅ Pass

---

## Format: Auto (Mixed detection)
### Test 1: Auto-detect Decimal
**Input:** `72 101 108 108 111`
**Expected Output:** `Hello`
**Status:** ✅ Pass

### Test 2: Auto-detect Hexadecimal with prefix
**Input:** `0x48 0x65 0x6C 0x6C 0x6F`
**Expected Output:** `Hello`
**Status:** ✅ Pass

### Test 3: Auto-detect Binary with prefix
**Input:** `0b01001000 0b01100101 0b01101100`
**Expected Output:** `Hel`
**Status:** ✅ Pass

### Test 4: Auto-detect Octal with prefix
**Input:** `0o110 0o145 0o154`
**Expected Output:** `Hel`
**Status:** ✅ Pass

### Test 5: Auto-detect Hex without prefix
**Input:** `48 65 6C 6C 6F`
**Expected Output:** `Hello`
**Status:** ✅ Pass

### Test 6: Auto-detect continuous hex
**Input:** `48656C6C6F` (no separator)
**Expected Output:** `Hello`
**Status:** ✅ Pass

---

## Special Cases

### Control Characters
**Input:** `9 10 13` (Tab, Line Feed, Carriage Return)
**Expected Output:** Shows actual control characters or [9][10][13] based on settings
**Status:** ✅ Pass

### Extended ASCII
**Input:** `200 201 202`
**Expected Output:** Characters for extended ASCII range
**Status:** ✅ Pass

### Unicode Support
**Input:** `128512` (with Unicode enabled)
**Expected Output:** `😀` (emoji)
**Status:** ✅ Pass

### Invalid Values
**Input:** `999` (out of range without Unicode)
**Expected Output:** Error message
**Status:** ✅ Pass

### Mixed Invalid
**Input:** `72 999 108`
**Expected Output:** Converts valid, shows error for 999
**Status:** ✅ Pass

---

## Custom Separator Tests

### Custom: Pipe (|)
**Input:** `72|101|108|108|111`
**Expected Output:** `Hello`
**Status:** ✅ Pass

### Custom: Dash (-)
**Input:** `72-101-108-108-111`
**Expected Output:** `Hello`
**Status:** ✅ Pass

### Custom: Semicolon (;)
**Input:** `0x48;0x65;0x6C;0x6C;0x6F`
**Expected Output:** `Hello`
**Status:** ✅ Pass

---

## Edge Cases

### Empty Input
**Input:** `` (empty)
**Expected Output:** `` (empty)
**Status:** ✅ Pass

### Single Character
**Input:** `72`
**Expected Output:** `H`
**Status:** ✅ Pass

### With Extra Spaces
**Input:** `72   101    108` (multiple spaces)
**Expected Output:** `Hel`
**Status:** ✅ Pass

### With Leading/Trailing Spaces
**Input:** `  72 101 108  `
**Expected Output:** `Hel`
**Status:** ✅ Pass

### Mixed Case Hex
**Input:** `48 65 6c 6C 6f`
**Expected Output:** `Hello`
**Status:** ✅ Pass

### Incomplete Last Chunk (Hex Continuous)
**Input:** `48656C6C6F2` (odd number of hex digits)
**Expected Output:** `Hello ` (pads last byte)
**Status:** ✅ Pass

---

## Summary Matrix

| Format      | Auto | Space | Comma | Tab | Newline | Custom | None |
|-------------|------|-------|-------|-----|---------|--------|------|
| Decimal     | ✅   | ✅    | ✅    | ✅  | ✅      | ✅     | ⚠️   |
| Hexadecimal | ✅   | ✅    | ✅    | ✅  | ✅      | ✅     | ✅   |
| Binary      | ✅   | ✅    | ✅    | ✅  | ✅      | ✅     | ✅   |
| Octal       | ✅   | ✅    | ✅    | ✅  | ✅      | ✅     | ✅   |
| Auto-detect | ✅   | ✅    | ✅    | ✅  | ✅      | ✅     | ✅   |

**Legend:**
- ✅ Fully Supported
- ⚠️ Not Recommended
- ❌ Not Supported

---

## Quick Test Examples for Each Format + Separator Combination

### Quick Copy-Paste Tests

1. **Decimal + Space**: `72 101 108 108 111` → `Hello`
2. **Decimal + Comma**: `72,101,108,108,111` → `Hello`
3. **Hex + Space**: `48 65 6C 6C 6F` → `Hello`
4. **Hex + Comma**: `48,65,6C,6C,6F` → `Hello`
5. **Hex + None**: `48656C6C6F` → `Hello`
6. **Binary + Space**: `01001000 01001001` → `HI`
7. **Binary + None**: `0100100001001001` → `HI`
8. **Octal + Space**: `110 145 154` → `Hel`
9. **Octal + Comma**: `110,145,154` → `Hel`
10. **Auto + 0x prefix**: `0x48 0x65 0x6C` → `Hel`
