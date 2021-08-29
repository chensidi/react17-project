import sessionStore from "@/utils/sessionStore";

const initialState = {
    cates: sessionStore.get('radioCates') ?? []
}

export default initialState;