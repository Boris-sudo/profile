import { effect, Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SidebarInteractionService {
    readonly isOpen = signal(false);

    constructor() {
        effect(() => {
            const status = this.isOpen();
            if (status) {
                document.body.style.overflowY = 'hidden';
            } else {
                document.body.style.overflowY = 'scroll';
            }
        });
    }

    open(): void {
        this.isOpen.set(true);
    }

    close(): void {
        this.isOpen.set(false);
    }

    toggle(): void {
        this.isOpen.update((value) => !value);
    }
}
