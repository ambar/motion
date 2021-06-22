import { DOMMotionComponents } from "./types"
import { createMotionProxy } from "./motion-proxy"
import { createMotionComponent } from "../../motion"
import { createDomMotionConfig } from "./utils/create-config"
import { domTags } from "./dom-tags"

/**
 * @public
 */
export const m = createMotionProxy(createDomMotionConfig as any)

/**
 * @internal
 */
export const getMFallback = () =>
    domTags.reduce((acc, tag: keyof DOMMotionComponents) => {
        return Object.assign(acc, { [tag]: createDomMotionComponent(tag) })
    }, {} as DOMMotionComponents)

function createDomMotionComponent<T extends keyof DOMMotionComponents>(key: T) {
    return createMotionComponent(
        createDomMotionConfig(key, { forwardMotionProps: false }) as any
    ) as DOMMotionComponents[T]
}
