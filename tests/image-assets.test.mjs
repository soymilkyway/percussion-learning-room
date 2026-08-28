import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import sharp from 'sharp';

const images = new URL('../public/images/', import.meta.url);
test('公開實拍圖具備統一畫布、透明背景與來源', async () => {
  const sources = JSON.parse(await fs.readFile(new URL('IMAGE_SOURCES.json', images), 'utf8'));
  assert.equal(sources.length, 20);
  const vibraslap = sources.find((entry) => entry.id === 'vibraslap');
  assert.equal(vibraslap.asset, 'instruments/cutouts/vibraslap-side.webp');
  assert.equal(vibraslap.source, 'https://commons.wikimedia.org/wiki/File:Vibraslap_-_side.jpg');
  for (const entry of sources) {
    const file = new URL(entry.asset, images);
    if (entry.publicationPending) {
      await assert.rejects(fs.access(file), { code: 'ENOENT' });
      continue;
    }
    const {data,info} = await sharp(await fs.readFile(file)).ensureAlpha().raw().toBuffer({resolveWithObject:true});
    assert.equal(info.width,760,entry.asset);
    assert.equal(info.height,560,entry.asset);
    let transparent=0,opaque=0;
    for(let i=3;i<data.length;i+=4){if(data[i]===0)transparent++;if(data[i]>240)opaque++;}
    assert.ok(opaque>500,entry.asset+' missing instrument');
    assert.ok(transparent>info.width*info.height*.3,entry.asset+' missing transparency');
    assert.equal(data[3],0,entry.asset+' corner is not transparent');
    assert.ok(entry.source.startsWith('https://'));
    assert.ok(entry.author&&entry.license&&entry.changes);
  }
});

test('三種握法使用實際圖片且尺寸一致', async()=>{
  for(const id of ['german','french','american-with-stand']){
    const m=await sharp(await fs.readFile(new URL(`grips/${id}.webp`,images))).metadata();
    assert.equal(m.width,1200);
    assert.equal(m.height,800);
  }
});
