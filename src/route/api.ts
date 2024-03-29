import { Request, Response, Router } from 'express';
import multer from 'multer';
import pino from 'pino';

import { processCSV, uploadCSV } from '../controllers/csv-processor';
import { listFilesInDirectory, downloadFileFromDataLake } from '../controllers/datalake';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const logger = pino({
    name: 'StatsWales-Alpha-App',
    level: 'debug'
});

export const apiRoute = Router();

logger.debug('API is runnuing...');

apiRoute.get('/', (req, res) => {
    res.json({ message: 'API is available' });
});

apiRoute.post('/csv', upload.single('csv'), async (req: Request, res: Response) => {
    // const page_number_str: string = req.query.page_number || req.body?.page_number;
    // const page_size_str: string = req.query.page_size || req.body?.page_size;
    // const page_number: number = Number.parseInt(page_number_str, 10) || 1;
    // const page_size: number = Number.parseInt(page_size_str, 10) || 100;
    const filemame: string | undefined = req.query.filename?.toString() || req.file?.originalname;
    if (filemame === undefined) {
        res.status(400);
        res.json({
            success: false,
            headers: undefined,
            data: undefined,
            errors: [
                {
                    field: 'filename',
                    message: 'No filename provided'
                }
            ]
        });
        return;
    }
    const processedCSV = await uploadCSV(req.file?.buffer, filemame);
    if (!processedCSV.success) {
        res.status(400);
    }
    res.json(processedCSV);
});

apiRoute.get('/csv/', async (req, res) => {
    const fileList = await listFilesInDirectory();
    res.json({ filelist: fileList });
});

apiRoute.get('/csv/:file', async (req, res) => {
    const filename = req.params.file;
    const file = await downloadFileFromDataLake(filename);
    if (file === undefined || file === null) {
        res.status(404);
        res.json({ message: 'File not found... file is null or undefined' });
        return;
    }
    res.setHeader('Content-Length', file.length);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.write(file, 'binary');
    res.end();
});

apiRoute.get('/csv/:file/view', async (req, res) => {
    const filename = req.params.file;
    const file = await downloadFileFromDataLake(filename);
    if (file === undefined || file === null) {
        res.status(404);
        res.json({ message: 'File not found... file is null or undefined' });
        return;
    }
    const page_number_str: string = req.query.page_number || req.body?.page_number;
    const page_size_str: string = req.query.page_size || req.body?.page_size;
    const page_number: number = Number.parseInt(page_number_str, 10) || 1;
    const page_size: number = Number.parseInt(page_size_str, 10) || 100;
    const processedCSV = await processCSV(filename, page_number, page_size);
    if (!processedCSV.success) {
        res.status(400);
    }
    res.json(processedCSV);
});
