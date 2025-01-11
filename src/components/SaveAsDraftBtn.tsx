import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"

const SaveAsDraftBtn = ({handleSaveDraft}: any) => {
    const [ loading, setLoading ] = useState<boolean>(false);
    return (
        <Button
            type="button" variant="outline" disabled={loading}
            onClick={() => {
                if(loading) return;
                handleSaveDraft()
                setLoading(true);
                const timeOut = setTimeout(() => setLoading(false), 200);

                return () => clearTimeout(timeOut);
            }}
        >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Saving' : "Save as Draft"}
        </Button>
    )
}

export default SaveAsDraftBtn