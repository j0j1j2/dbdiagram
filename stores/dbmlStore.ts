import { Parser } from '@dbml/core';
import { RawDatabase } from '@dbml/core/types/model_structure/database';
import { create } from 'zustand';

interface DbmlStore {
    dbml: RawDatabase;
    setDbml: (dbml: RawDatabase) => void;
}

const useDbmlStore = create<DbmlStore>((set) => ({
    dbml: Parser.parseDBMLToJSONv2(''),
    setDbml: (dbml) => set({ dbml })
}));

export default useDbmlStore;