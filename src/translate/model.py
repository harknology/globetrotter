from transformers import T5ForConditionalGeneration, T5Tokenizer

model_name = 'google/madlad400-3b-mt'
model = T5ForConditionalGeneration.from_pretrained(model_name, device_map="auto")
tokenizer = T5Tokenizer.from_pretrained(model_name)

def translate(to: str, text: str):
    input_ids = tokenizer("<2{0}> {1}".format(to, text), return_tensors=to).input_ids.to(model.device)
    outputs = model.generate(input_ids=input_ids)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)