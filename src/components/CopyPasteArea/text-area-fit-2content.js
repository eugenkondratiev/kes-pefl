export default function FitToContent(id, maxHeight) {
    const text = id && id.style ? id : document.getElementById(id);
    if (!text) {
        return;
    }

    if (text.clientHeight === text.scrollHeight) {
        text.style.height = "30px";
    }

    let adjustedHeight = text.clientHeight;
    if (!maxHeight || maxHeight > adjustedHeight) {
        adjustedHeight = Math.max(text.scrollHeight, adjustedHeight);
        if (maxHeight)
            adjustedHeight = Math.min(maxHeight, adjustedHeight);

        if (adjustedHeight > text.clientHeight)
            text.style.height = adjustedHeight + 10 +"px";
    }
}
