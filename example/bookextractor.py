
def bookextractor(path):
    global chapter
    with open(path,'r',encoding='UTF8') as f:
        text = []
        while True:
            line = f.readline()
            if line == '':
                break
            text.append(line) 


        i = 1
        sentences = ''
   
        for txt in text:
            
            if txt[:-1] == chapter[i] or txt == chapter[i] :
                print(sentences)
                with open(f'./book/sherlockholmes/{chapter[i-1]}.txt','w',encoding='UTF8') as f2:
                    f2.write(chapter[i-1])
                    f2.write(sentences)

                sentences = ''
                i += 1
            else:
                if txt =='\n':
                    continue
                sentences += txt

