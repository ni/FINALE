export class InputHelper {
    public static IsHelpKeyBinding(event: KeyboardEvent) {
        return this.IsModifierDown(event) && this.IsHelpKey(event.key);
    }
    public static IsSwitcherKeyBinding(event: KeyboardEvent) {
        return this.IsModifierDown(event) && this.IsSwitcherKey(event.key);
    }
    public static IsModifierDown(event: KeyboardEvent) {
        return (event.ctrlKey && event.shiftKey);
    }
    private static IsHelpKey(key: string) {
        return key.toLowerCase() === "h";
    }
    private static IsSwitcherKey(key: string) {
        return key.toLowerCase() === "e";
    }
}
