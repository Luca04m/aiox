const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageBreak, LevelFormat, Header, Footer, PageNumber
} = require('docx');
const fs = require('fs');

const GOLD = "C9A84C";
const BLACK = "1A1A1A";
const DARK_GRAY = "2D2D2D";
const LIGHT_GOLD = "F5E6C8";
const VERY_LIGHT = "FAF6F0";
const WHITE = "FFFFFF";

const cellBorder = { style: BorderStyle.SINGLE, size: 1, color: "C9A84C" };
const cellBorders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };

function heading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: GOLD, space: 4 } },
    children: [new TextRun({ text, bold: true, font: "Georgia", size: 28, color: GOLD, allCaps: true })]
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    alignment: opts.center ? AlignmentType.CENTER : AlignmentType.LEFT,
    children: [new TextRun({ text, font: "Calibri", size: opts.size || 22, bold: opts.bold || false, italics: opts.italic || false, color: opts.color || BLACK })]
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 80 },
    children: [new TextRun({ text, font: "Calibri", size: 22, color: BLACK })]
  });
}

function spacer(before = 100) {
  return new Paragraph({ spacing: { before, after: 0 }, children: [new TextRun("")] });
}

function quoteBlock(text, author) {
  return new Table({
    width: { size: 8640, type: WidthType.DXA }, columnWidths: [8640],
    rows: [new TableRow({ children: [new TableCell({
      borders: { top: noBorder, right: noBorder, bottom: noBorder, left: { style: BorderStyle.SINGLE, size: 12, color: GOLD } },
      shading: { fill: VERY_LIGHT, type: ShadingType.CLEAR },
      margins: { top: 120, bottom: 120, left: 240, right: 240 },
      width: { size: 8640, type: WidthType.DXA },
      children: [
        new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: `"${text}"`, font: "Georgia", size: 22, italics: true, color: DARK_GRAY })] }),
        new Paragraph({ children: [new TextRun({ text: `— ${author}`, font: "Calibri", size: 20, bold: true, color: GOLD })] }),
      ]
    })] })]
  });
}

function productCard(title, specs, descr, forWho, pitch, nota) {
  return new Table({
    width: { size: 8640, type: WidthType.DXA }, columnWidths: [8640],
    rows: [
      new TableRow({ children: [new TableCell({
        borders: cellBorders, shading: { fill: BLACK, type: ShadingType.CLEAR },
        margins: { top: 140, bottom: 140, left: 240, right: 240 }, width: { size: 8640, type: WidthType.DXA },
        children: [new Paragraph({ children: [
          new TextRun({ text: title, bold: true, font: "Georgia", size: 28, color: GOLD }),
          new TextRun({ text: "  |  " + specs, font: "Calibri", size: 20, color: "AAAAAA" }),
        ]})]
      })] }),
      new TableRow({ children: [new TableCell({
        borders: cellBorders, shading: { fill: VERY_LIGHT, type: ShadingType.CLEAR },
        margins: { top: 140, bottom: 140, left: 240, right: 240 }, width: { size: 8640, type: WidthType.DXA },
        children: [
          new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "O que é:  ", bold: true, font: "Calibri", size: 21, color: BLACK }), new TextRun({ text: descr, font: "Calibri", size: 21, color: DARK_GRAY })] }),
          new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Para quem:  ", bold: true, font: "Calibri", size: 21, color: BLACK }), new TextRun({ text: forWho, font: "Calibri", size: 21, color: DARK_GRAY })] }),
          new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Como vender:  ", bold: true, font: "Calibri", size: 21, color: BLACK }), new TextRun({ text: `"${pitch}"`, font: "Calibri", size: 21, italics: true, color: DARK_GRAY })] }),
          new Paragraph({ children: [new TextRun({ text: "Versão Completa:  ", bold: true, font: "Calibri", size: 21, color: GOLD }), new TextRun({ text: nota, font: "Calibri", size: 21, color: DARK_GRAY })] }),
        ]
      })] }),
    ]
  });
}

const doc = new Document({
  numbering: { config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }] },
  styles: {
    default: { document: { run: { font: "Calibri", size: 22, color: BLACK } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 28, bold: true, font: "Georgia", color: GOLD, allCaps: true }, paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
    ]
  },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1200, bottom: 1440, left: 1200 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: GOLD, space: 4 } }, spacing: { after: 0 }, children: [new TextRun({ text: "MR. LION  |  DIRECIONAL DO VENDEDOR", font: "Calibri", size: 18, color: "999999" })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, border: { top: { style: BorderStyle.SINGLE, size: 2, color: GOLD, space: 4 } }, children: [new TextRun({ text: "Beba com responsabilidade  |  Proibido para menores de 18 anos  |  ", font: "Calibri", size: 16, color: "999999" }), new TextRun({ children: [PageNumber.CURRENT], font: "Calibri", size: 16, color: "999999" })] })] }) },
    children: [
      spacer(600),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [new TextRun({ text: "MR. LION", bold: true, font: "Georgia", size: 72, color: GOLD })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [new TextRun({ text: "BRAZILIAN BLENDED WHISKY", font: "Georgia", size: 28, color: "888888", allCaps: true })] }),
      spacer(80),
      new Paragraph({ alignment: AlignmentType.CENTER, border: { top: { style: BorderStyle.SINGLE, size: 4, color: GOLD }, bottom: { style: BorderStyle.SINGLE, size: 4, color: GOLD } }, spacing: { before: 120, after: 120 }, children: [new TextRun({ text: "DIRECIONAL DO VENDEDOR", bold: true, font: "Georgia", size: 36, color: BLACK, allCaps: true })] }),
      spacer(80),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Evento: Bebericando", font: "Calibri", size: 26, italics: true, color: DARK_GRAY })] }),
      spacer(600),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Sabor, Sofisticação e Singularidade.", font: "Georgia", size: 24, italics: true, color: "888888" })] }),

      new Paragraph({ children: [new PageBreak()] }),

      heading("1. Quem é a Mr. Lion"),
      body("A Mr. Lion nasceu da união entre duas forças:"),
      spacer(60),
      bullet("Lamas Destilaria — expertise artesanal premiada internacionalmente"),
      bullet("MD Chefe — rapper, autenticidade, estilo e presença"),
      spacer(120),
      body("Não é só uma bebida. É um estilo de vida: intensidade, elegância, exclusividade."),
      body("O leão é o símbolo — força, nobreza, realeza."),
      spacer(120),
      new Table({ width: { size: 8640, type: WidthType.DXA }, columnWidths: [8640], rows: [new TableRow({ children: [new TableCell({ borders: cellBorders, shading: { fill: BLACK, type: ShadingType.CLEAR }, margins: { top: 200, bottom: 200, left: 400, right: 400 }, width: { size: 8640, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '"Paladar da realeza."', bold: true, font: "Georgia", size: 32, italics: true, color: GOLD })] })] })] })] }),
      spacer(200),

      heading("2. O que é a Versão Completa"),
      body("Toda garrafa tem duas versões:"),
      spacer(80),
      new Table({ width: { size: 8640, type: WidthType.DXA }, columnWidths: [4320, 4320], rows: [new TableRow({ children: [
        new TableCell({ borders: cellBorders, shading: { fill: DARK_GRAY, type: ShadingType.CLEAR }, margins: { top: 140, bottom: 140, left: 240, right: 240 }, width: { size: 4320, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "GARRAFA SIMPLES", bold: true, font: "Calibri", size: 22, color: WHITE })] }), new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Só a bebida", font: "Calibri", size: 20, color: "AAAAAA" })] })] }),
        new TableCell({ borders: cellBorders, shading: { fill: GOLD, type: ShadingType.CLEAR }, margins: { top: 140, bottom: 140, left: 240, right: 240 }, width: { size: 4320, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "VERSÃO COMPLETA", bold: true, font: "Calibri", size: 22, color: BLACK })] }), new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Garrafa + Pingente + Embalagem/Lata exclusiva", font: "Calibri", size: 20, color: BLACK })] })] }),
      ] })] }),
      spacer(160),
      quoteBlock("A versão completa é o presente perfeito. Chegou numa lata linda, com pingente — você entrega como mimo.", "Use na venda"),

      new Paragraph({ children: [new PageBreak()] }),

      heading("3. Os 3 Produtos — Saiba de Cor"),
      body("Cada produto tem personalidade própria. Conheça bem cada um para indicar o certo para cada cliente."),
      spacer(160),
      productCard("Mr. Lion Blended", "750ml | 40% vol", "Whisky brasileiro de alta qualidade, profundidade e presença.", "Quem quer um blended brasileiro que redefine o padrão.", "É o nosso carro-chefe. Whisky brasileiro com personalidade própria, profundidade de verdade.", "acompanha embalagem exclusiva + pingente oficial."),
      spacer(200),
      productCard("Mr. Lion Honey", "750ml | 40% vol", "Licor que une o calor do whisky com mel silvestre natural.", "Quem prefere algo mais suave e envolvente. Ótimo ponto de entrada.", "Mel silvestre de verdade — você sente que é mel, não adoçante. Suave, mas com corpo.", "acompanha lata exclusiva + pingente oficial."),
      spacer(200),
      productCard("Mr. Lion Cappuccino", "750ml | 17% vol", "Bebida única com café, leite e cacau — cremosa e aromática.", "Quem curte café, sobremesa em copo, algo diferente e único.", "Imagina o sabor de um cappuccino premium, mas em uma bebida. Único no mercado.", "acompanha lata exclusiva + pingente oficial."),

      new Paragraph({ children: [new PageBreak()] }),

      heading("4. Perfil do Cliente → Produto Certo"),
      body("Leia o cliente antes de oferecer. Cada perfil tem um produto ideal:"),
      spacer(120),
      new Table({ width: { size: 8640, type: WidthType.DXA }, columnWidths: [4320, 4320], rows: [
        new TableRow({ children: [new TableCell({ borders: cellBorders, shading: { fill: BLACK, type: ShadingType.CLEAR }, margins: { top: 100, bottom: 100, left: 200, right: 200 }, width: { size: 4320, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "PERFIL DO CLIENTE", bold: true, font: "Calibri", size: 20, color: GOLD })] })] }), new TableCell({ borders: cellBorders, shading: { fill: BLACK, type: ShadingType.CLEAR }, margins: { top: 100, bottom: 100, left: 200, right: 200 }, width: { size: 4320, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "INDICAR", bold: true, font: "Calibri", size: 20, color: GOLD })] })] })] }),
        ...[["Aprecia whisky clássico","Mr. Lion Blended"],["Gosta de suave / doce","Mr. Lion Honey"],["Curte café ou novidade","Mr. Lion Cappuccino"],["Quer presentear alguém","Qualquer Versão Completa"],["Quer experimentar tudo","Um de cada sabor"]].map(([p,r],i) =>
          new TableRow({ children: [new TableCell({ borders: cellBorders, shading: { fill: i%2===0?VERY_LIGHT:WHITE, type: ShadingType.CLEAR }, margins: { top: 100, bottom: 100, left: 200, right: 200 }, width: { size: 4320, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: p, font: "Calibri", size: 21, color: BLACK })] })] }), new TableCell({ borders: cellBorders, shading: { fill: i%2===0?VERY_LIGHT:WHITE, type: ShadingType.CLEAR }, margins: { top: 100, bottom: 100, left: 200, right: 200 }, width: { size: 4320, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: r, bold: true, font: "Calibri", size: 21, color: DARK_GRAY })] })] })] })
        )
      ] }),
      spacer(280),

      heading("5. Argumentos de Venda Prontos"),
      body("Use essas respostas quando o cliente hesitar ou questionar:"),
      spacer(120),
      ...[
        ['"O que diferencia da concorrência?"','Premiações internacionais, produção artesanal pela Lamas Destilaria e a identidade única do MD Chefe. Não tem igual no mercado nacional.'],
        ['"Nunca ouvi falar..."','É exatamente por isso que vale provar agora. Quem experimenta, volta. Temos clientes que não trocam mais.'],
        ['"É whisky mesmo?"','O Blended é um whisky brasileiro 40% vol, sério e com profundidade. O Honey e o Cappuccino são licores à base de whisky — mais suaves, mas com personalidade forte.'],
        ['"Para dar de presente?"','Perfeito. A versão completa vem numa embalagem linda com pingente colecionável. Chega pronto para presentear.'],
      ].flatMap(([q,a]) => [
        new Table({ width: { size: 8640, type: WidthType.DXA }, columnWidths: [8640], rows: [
          new TableRow({ children: [new TableCell({ borders: cellBorders, shading: { fill: DARK_GRAY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 200, right: 200 }, width: { size: 8640, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: q, bold: true, font: "Calibri", size: 21, italics: true, color: LIGHT_GOLD })] })] })] }),
          new TableRow({ children: [new TableCell({ borders: cellBorders, shading: { fill: VERY_LIGHT, type: ShadingType.CLEAR }, margins: { top: 100, bottom: 100, left: 200, right: 200 }, width: { size: 8640, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: a, font: "Calibri", size: 21, color: DARK_GRAY })] })] })] }),
        ] }),
        spacer(120),
      ]),

      new Paragraph({ children: [new PageBreak()] }),

      heading("6. Linguagem da Marca"),
      body("Use estas palavras — elas estão no DNA da Mr. Lion:"),
      spacer(120),
      new Table({ width: { size: 8640, type: WidthType.DXA }, columnWidths: [2160,2160,2160,2160], rows: [
        new TableRow({ children: ["Sofisticação","Singularidade","Autenticidade","Exclusividade"].map(w => new TableCell({ borders: cellBorders, shading: { fill: BLACK, type: ShadingType.CLEAR }, margins: { top: 120, bottom: 120, left: 160, right: 160 }, width: { size: 2160, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, font: "Calibri", size: 20, color: GOLD })] })] })) }),
        new TableRow({ children: ["Nobreza","Presença","Elegância","Realeza"].map(w => new TableCell({ borders: cellBorders, shading: { fill: DARK_GRAY, type: ShadingType.CLEAR }, margins: { top: 120, bottom: 120, left: 160, right: 160 }, width: { size: 2160, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, font: "Calibri", size: 20, color: LIGHT_GOLD })] })] })) }),
        new TableRow({ children: ["Artesanal","Intensidade","Premium","Autoral"].map(w => new TableCell({ borders: cellBorders, shading: { fill: "3A3A3A", type: ShadingType.CLEAR }, margins: { top: 120, bottom: 120, left: 160, right: 160 }, width: { size: 2160, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, font: "Calibri", size: 20, color: "CCCCCC" })] })] })) }),
      ] }),
      spacer(200),
      new Table({ width: { size: 8640, type: WidthType.DXA }, columnWidths: [4320,4320], rows: [new TableRow({ children: [
        new TableCell({ borders: cellBorders, shading: { fill: "FDECEA", type: ShadingType.CLEAR }, margins: { top: 120, bottom: 120, left: 200, right: 200 }, width: { size: 4320, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "EVITE", bold: true, font: "Calibri", size: 21, color: "CC0000" })] }), new Paragraph({ children: [new TextRun({ text: '"barato"  "popular"  "simples"', font: "Calibri", size: 21, italics: true, color: DARK_GRAY })] })] }),
        new TableCell({ borders: cellBorders, shading: { fill: "EAFAEA", type: ShadingType.CLEAR }, margins: { top: 120, bottom: 120, left: 200, right: 200 }, width: { size: 4320, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "USE", bold: true, font: "Calibri", size: 21, color: "006600" })] }), new Paragraph({ children: [new TextRun({ text: '"acessível com sofisticação"  "exclusivo"  "único"', font: "Calibri", size: 21, italics: true, color: DARK_GRAY })] })] }),
      ] })] }),
      spacer(280),

      heading("7. A Garrafa como Objeto"),
      body("As garrafas Mr. Lion foram criadas para ir além do sabor:"),
      spacer(100),
      bullet("Design exclusivo e rótulo marcante em cada produto"),
      bullet("O pingente é item colecionável — reforça a identidade da marca"),
      bullet("As embalagens/latas transformam a garrafa num objeto de decoração e presente"),
      spacer(120),
      quoteBlock("Muita gente coleciona as garrafas e os pingentes. Viram peça.", "Use para valorizar a Versão Completa"),
      spacer(280),

      heading("8. O Símbolo do Leão"),
      body("Majestoso e imponente, o leão traduz a alma da Mr. Lion."),
      body("Um ícone de poder e elegância que inspira confiança e diferenciação."),
      spacer(100),
      new Table({ width: { size: 8640, type: WidthType.DXA }, columnWidths: [8640], rows: [new TableRow({ children: [new TableCell({ borders: cellBorders, shading: { fill: BLACK, type: ShadingType.CLEAR }, margins: { top: 200, bottom: 200, left: 400, right: 400 }, width: { size: 8640, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Ao brindar com Mr. Lion, você celebra não apenas o sabor,", font: "Georgia", size: 24, italics: true, color: "CCCCCC" })] }), new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "mas o espírito de exclusividade que o leão simboliza.", font: "Georgia", size: 24, italics: true, color: GOLD })] })] })] })] }),
      spacer(280),

      heading("9. Resumo em 3 Frases — Decore"),
      body("Se precisar apresentar a marca em 30 segundos:"),
      spacer(120),
      ...[
        ["1","A Mr. Lion é a bebida premium brasileira que nasceu da parceria entre a Lamas Destilaria e o MD Chefe — artesanal, premiada e exclusiva."],
        ["2","São 3 produtos: Blended (whisky clássico), Honey (mel silvestre + whisky) e Cappuccino (café + cacau) — cada um com personalidade única."],
        ["3","Mais do que beber, é celebrar com sofisticação. O leão simboliza força, nobreza e exclusividade — é isso que cada gole entrega."],
      ].flatMap(([n,f]) => [
        new Table({ width: { size: 8640, type: WidthType.DXA }, columnWidths: [800,7840], rows: [new TableRow({ children: [new TableCell({ borders: cellBorders, shading: { fill: GOLD, type: ShadingType.CLEAR }, margins: { top: 140, bottom: 140, left: 160, right: 160 }, width: { size: 800, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: n, bold: true, font: "Georgia", size: 28, color: BLACK })] })] }), new TableCell({ borders: cellBorders, shading: { fill: VERY_LIGHT, type: ShadingType.CLEAR }, margins: { top: 140, bottom: 140, left: 240, right: 240 }, width: { size: 7840, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: f, font: "Calibri", size: 22, color: DARK_GRAY })] })] })] })] }),
        spacer(120),
      ]),

      spacer(200),
      new Table({ width: { size: 8640, type: WidthType.DXA }, columnWidths: [8640], rows: [new TableRow({ children: [new TableCell({ borders: cellBorders, shading: { fill: BLACK, type: ShadingType.CLEAR }, margins: { top: 200, bottom: 200, left: 400, right: 400 }, width: { size: 8640, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [new TextRun({ text: "CONTATO DA MARCA", bold: true, font: "Georgia", size: 22, color: GOLD, allCaps: true })] }), new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [new TextRun({ text: "+55 (31) 98318-4296   |   comercial@casamrlion.com.br", font: "Calibri", size: 21, color: WHITE })] }), new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Matozinhos - MG  (Lamas Destilaria)", font: "Calibri", size: 19, color: "888888" })] })] })] })] }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/Volumes/KINGSTON/aiox/mr-lion-direcional-vendedor.docx', buffer);
  console.log('DOCX criado!');
}).catch(err => { console.error(err); process.exit(1); });
