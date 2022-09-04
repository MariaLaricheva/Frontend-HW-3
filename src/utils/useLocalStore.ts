import React from "react";

export interface ILocalStore {
  destroy(): void;
}

// тип Т наследует интерфейс айлокалстор (проверить)
export const useLocalStore = <T extends ILocalStore> (creator: () => T) => {
  const container = React.useRef<null | T>(null)
  if (container.current === null) {
    container.current = creator()
  }

  React.useEffect(() => {
    return () => container.current?.destroy()
  }) //массива зависимостей нет, в примере он был пустой

  return container.current
}