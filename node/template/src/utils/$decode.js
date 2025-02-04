export function $decode(text) {
    return new TextDecoder().decode(Uint8Array.from(atob(text), (m) => m.codePointAt(0)))
}